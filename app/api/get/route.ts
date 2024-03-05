import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({origin: true}))
app.use(express.json())

export async function GET(request: Request) { 
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  try {
    const result =
      await sql`SELECT count FROM posts WHERE id = ${id} ORDER BY count DESC`;
      
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) { 
    return NextResponse.json({ error }, { status: 500 });
  }
}

