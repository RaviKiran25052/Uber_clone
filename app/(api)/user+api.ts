import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: Request) {
	try {
		const { name, email, clerkId } = await request.json();

		if (!name || !email || !clerkId)
			return Response.json({ error: "Missing required fields.!" }, { status: 400 });

		await sql`
			CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				name VARCHAR(100) NOT NULL,
				email VARCHAR(100) UNIQUE NOT NULL,
				clerk_id VARCHAR(50) UNIQUE NOT NULL
			);
		`;

		// Insert user data
		const response = await sql`
			INSERT INTO users (name, email, clerk_id) 
			VALUES (${name}, ${email}, ${clerkId})
			RETURNING *;
		`;

		return new Response(JSON.stringify({ data: response, msg: "User Created..!" }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);
		return Response.json({ data: error, msg: "Failed to Create" }, { status: 500 });
	}
}