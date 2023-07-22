import Tool from "@components/Tool";


const fetchFirstPosts = async () => {
  const queryParam = `page=1&pageSize=10`;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/tool?${queryParam}`);
    const data = await response.json();
  return data;
}

const AITool = async () => {
  var data = await fetchFirstPosts();
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

    <Tool data={data} />
</section>
  )
}

export default AITool