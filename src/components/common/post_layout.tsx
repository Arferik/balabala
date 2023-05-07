import { api } from "~/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import "twin.macro";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IconButton, Input } from "../myd";

export const PostLayout = () => {
  const { mutate: postEmptyMutate } = api.post.savePostEmpty.useMutation({
    onSuccess: (data) => {
      data && route.push(`/post/edit?p=${data.id}`);
    },
  });
  const route = useRouter();
  const { data, hasNextPage, fetchNextPage } =
    api.post.infinitePosts.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  useEffect(() => {
    if (
      data &&
      Array.isArray(data.pages) &&
      data?.pages?.length > 0 &&
      route.pathname === "/post/edit"
    ) {
      const firstPage = data.pages[0];
      if (firstPage) {
        const [firstPost] = firstPage.items || [];
        if (firstPost) route.push(`/post/edit?p=${firstPost.id}`);
      }
    }
  }, []);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const addPost = () => postEmptyMutate();
  return (
    <div tw="p-6 box-border">
      <div tw="flex items-center mb-2 space-x-1">
        <Input type="text" label="请输入文章标题" onChange={onInputChange} />
        <IconButton
          icon="add"
          onClick={addPost}
          tw="flex-none"
          variant="filled"
        ></IconButton>
      </div>
      <InfiniteScroll
        dataLength={data?.pages.length || 0} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p tw="text-center">
            <b>这是底线</b>
          </p>
        }
      >
        {data?.pages.map((page) => {
          return (
            <>
              {page.items.map((post) => {
                return (
                  <div
                    tw="relative box-border flex h-14 w-full cursor-pointer items-center overflow-hidden rounded-[1.75rem] pl-4 pr-6 hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:after:h-[200%] hover:after:w-[200%] hover:after:bg-on-surface hover:after:opacity-[.16]
                  active:after:absolute active:after:top-[-50%] active:after:left-[-50%] active:after:h-[200%] active:after:w-[200%] active:after:bg-on-surface active:after:opacity-[.24]"
                    key={post.id}
                  >
                    {post.title}
                  </div>
                );
              })}
            </>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
