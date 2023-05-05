import { type NextPage } from "next";
import "twin.macro";
import { ArticleJsonLd, NextSeo } from "next-seo";
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
import mermaid from "@bytemd/plugin-mermaid";

const plugins = [
  gfm(),
  breaks(),
  gemoji(),
  highlight({
    init(hljs) {
      console.log("hljs", hljs);
    },
  }),
  byteMath(),
  mermaid(),
  frontMatter(),
];

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const postDetail = api.post.postById.useQuery(id as string);
  return (
    <>
      <NextSeo
        title={postDetail.data?.title || ""}
        description={postDetail.data?.introduce || ""}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url="https://example.com/blog"
        title={postDetail.data?.title || ""}
        images={[]}
        datePublished="2015-02-05T08:00:00+08:00"
        dateModified="2015-02-05T09:00:00+08:00"
        authorName="yy"
        description={postDetail.data?.introduce || ""}
      />
      <Layout>
        {postDetail.isLoading ? (
          <>Loading</>
        ) : (
          <article tw="container mx-auto mt-20 ">
            {postDetail.data ? (
              <div
                tw="h-80 md:h-96 lg:h-[34rem]
            relative mt-16 box-border px-4 md:(px-0) container mx-auto"
              >
                {postDetail?.data?.cover && (
                  <Image
                    fill
                    src={postDetail?.data?.cover.url || ""}
                    alt={postDetail?.data?.cover.name || ""}
                    tw="[object-fit: cover] rounded-3xl overflow-hidden !static"
                  ></Image>
                )}
                <div
                  tw="absolute top-0 z-10 right-0 flex h-full w-full
             flex-col items-center justify-center md:items-start box-border p-14"
                >
                  <h1 tw="display-large text-on-background bottom-2 md:display-xl lg:display-xxl">
                    {postDetail.data.title}
                  </h1>
                  <h4 tw="body-large mt-2 text-on-background md:title-large">
                    {postDetail.data?.introduce}
                  </h4>
                </div>
              </div>
            ) : (
              []
            )}
            <Viewer
              tw="px-4"
              value={postDetail?.data?.content || ""}
              plugins={plugins}
            ></Viewer>
          </article>
        )}
      </Layout>
    </>
  );
};

export default Post;
