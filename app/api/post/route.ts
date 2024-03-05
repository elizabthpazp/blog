import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({origin: true}))
app.use(express.json())

export async function POST(request: Request) {
  console.log('entraaa')
  console.log(request)
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const count = searchParams.get('count');
  const first = searchParams.get('first');
 console.log('params '+ searchParams)
  try {
    //let result;
    // if(first)
    // result = await sql`INSERT INTO posts (id, count) VALUES (${id}, ${count})`;
    // else
    let result = await sql`UPDATE posts SET count = ${count} WHERE id = ${id}`;
    console.log(result)
    return NextResponse.json({ result }, { status: 200 }); 
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
 