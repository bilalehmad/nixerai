import Feed from "@components/Feed";

const fetchFirstPosts = async () => {
  const queryParam = `page=1&pageSize=10`;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt?${queryParam}`);
  const data = await response.json();
  return JSON.stringify(data);
}

  const fetchCategory = async () => {
        const response = await fetch(`${process.env.NEXTAUTH_URL}//api/category`);
        const data = await response.json();
        return JSON.stringify(data)
    }

const Home = async () => {
  const data =  await fetchFirstPosts();
  const category = await fetchCategory();
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
        Explore  and Use the most Extensive Collection of Prompt
        </p>
        {/* <SearchFeedBar /> */}
        {/* <PromptCardList data={data} /> */}
        <Feed data={data} category={category} />
    </section>

  )
}

export default Home;