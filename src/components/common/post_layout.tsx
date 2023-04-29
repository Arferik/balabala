import { api } from "~/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import "twin.macro";
import { Input } from "../ui/input";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IconButton } from "../myd";

export const PostLayout = () => {
  const { mutate: postEmptyMutate } = api.post.savePostEmpty.useMutation({
    onSuccess: (data) => {
      console.log("postEmptyMutate", data);
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
      const [firstPost] = data?.pages[0].items || [];
      if (firstPost) route.push(`/post/edit?p=${firstPost.id}`);
    }
  }, []);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const addPost = () => postEmptyMutate();
  return (
    <div>
      <IconButton icon="add" onClick={addPost}></IconButton>
      <Input type="text" label="请输入文章标题" onChange={onInputChange} />
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
                return <div key={post.id}>{post.title}</div>;
              })}
            </>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
