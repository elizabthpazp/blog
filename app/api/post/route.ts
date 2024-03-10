import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({origin: true}))
app.use(express.json())

export async function POST(request: Request) { 
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const count = searchParams.get('count');
  const first = searchParams.get('first');
 
  try {
    let result;
    if(first)
    result = await sql`INSERT INTO posts (id, count) VALUES (${id}, ${count})`;
    else
    result = await sql`UPDATE posts SET count = ${count} WHERE id = ${id}`;
 
    return NextResponse.json({ result }, { status: 200 }); 
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
 