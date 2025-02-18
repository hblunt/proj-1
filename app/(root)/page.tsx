import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _id: 1,
      _createdAt: new Date(),
      views: 11,
      author: { id: 1 },
      description: "This is a description",
      image: "https://picsum.photos/200/300",
      categories: ["Category 1", "Category 2"],
      title: "This is a title",
    },
  ];

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
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-16-medium">No posts found</p>
          )}
        </ul>
      </section>
    </>
  );
}
