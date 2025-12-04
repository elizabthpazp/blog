'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function revalidateCache() {
  // pass an empty durations object to satisfy typings in this Next version
  revalidateTag('likes', {})
}