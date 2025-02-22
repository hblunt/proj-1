import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY, testSanityConnection } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  try {
    // Test direct connection first
    const directResult = await testSanityConnection();
    console.log("Direct connection test:", directResult);

    // Then try the regular fetch
    const result = await sanityFetch({
      query: STARTUP_QUERY,
      params: params,
    });

    if (!result || !result.data) {
      console.error("No data received from Sanity");
    }

    const { data: posts } = result;

    return (
      <>
        <section className="pink_container">
          <h1 className="heading">
            Pitch Your Idea, <br /> Connect With Other Entrepreneurs
          </h1>
          <p className="sub-heading">Submit Ideas, Vote on Ideas, Get Funded</p>
          <SearchForm query={query} />
        </section>
        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search Results for "${query}"` : "All Startups"}
          </p>
          <ul className="mt-7 card-grid">
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post._id} post={post} />
              ))
            ) : (
              <p className="text-16-medium">No posts found</p>
            )}
          </ul>
        </section>
        <SanityLive />
      </>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    throw error;
  }
}
