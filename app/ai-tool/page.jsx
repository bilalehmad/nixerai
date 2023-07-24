import Tool from "@components/Tool";

export const revalidate = 0

const fetchFirstPosts = async () => {
  const queryParam = `page=1&pageSize=10`;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tool?${queryParam}`);
    const data = await response.json();
  return data;
}

const fetchCategory = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}//api/category`);
  const data = await response.json();
  return data;
}

const AITool =  async() => {
  const data = await fetchFirstPosts();
  const category = await fetchCategory();
  return (
    <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Tools</span>
    </h1>
    <p className="desc text-center">
    Explore and Use the most Extensive Collection of  AI Tools
    </p>

    <Tool data={data} category={category}  />
</section>
  )
}

export default AITool