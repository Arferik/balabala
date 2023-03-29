import { type NextPage } from "next";
import "twin.macro";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "~/components";
import { api } from "~/utils";
import { Viewer } from "@bytemd/react";
import breaks from "@bytemd/plugin-breaks";
import frontMatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import byteMath from "@bytemd/plugin-math";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";

const plugins = [
  gfm(),
  breaks(),
  gemoji(),
  highlight(),
  byteMath(),
  zoom(),
  mermaid(),
  frontMatter(),
];

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const postDetail = api.post.getPostById.useQuery((id as string) || "");
  return (
    <Layout>
      {postDetail.isLoading ? (
        <>Loading</>
      ) : (
        <>
          <article tw="container mx-auto mt-20">
            <header tw="overflow-hidden relative">
              <div tw="z-10 flex h-full w-full flex-col items-center justify-center ">
                <h1 tw="display-small text-on-surface md:display-large">
                  {postDetail?.data?.title}
                </h1>
                <h4 tw="title-large mt-2 text-secondary md:headline-medium">
                  {postDetail?.data?.description}
                </h4>
              </div>
            </header>
            <div tw="w-full h-80 md:h-96 lg:h-[34rem] relative mt-16 container mx-auto px-4">
              {postDetail?.data?.cover && (
                <Image
                  fill
                  src={postDetail?.data?.cover || ""}
                  alt="Post picture"
                  tw="[object-fit: cover] rounded-3xl"
                ></Image>
              )}
            </div>
            <Viewer
              tw="px-4"
              value={postDetail?.data?.content || ""}
              plugins={plugins}
            ></Viewer>
          </article>
        </>
      )}
    </Layout>
  );
};

export default Post;
