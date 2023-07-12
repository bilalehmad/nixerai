import Tool from "@components/Tool";

const AITool = () => {
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
    
    <Tool />
</section>
  )
}

export default AITool