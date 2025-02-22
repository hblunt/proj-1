import { defineQuery } from "next-sanity";
import { client } from "./client";

export const STARTUP_QUERY = defineQuery(`*[
  _type == "startup" && 
  defined(slug.current) &&
  ($search == null || category match $search || author->name match $search || title match $search || description match $search)
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  image,
  category
}`);

export const STARTUP_QUERY_BY_ID =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,
    name,
    image,
    username,
    bio
  },
  views,
  description,
  image,
  category,
  pitch
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  views
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && ID == $id][0] {
  _id,
  id,
  name,
  email,
  image,
  username,
  bio
}`);

// Keep the test function for future debugging if needed
export async function testSanityConnection() {
  try {
    const result = await client.fetch(STARTUP_QUERY, { search: null });
    console.log("Direct Sanity query result:", result);
    return result;
  } catch (error) {
    console.error("Error querying Sanity:", error);
    throw error;
  }
}
