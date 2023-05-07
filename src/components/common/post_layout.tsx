import { api } from "~/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import "twin.macro";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IconButton, Input } from "../myd";
import Link from "next/link";
import { MenuItem } from "./Menu";

export const PostLayout: React.FC<{ onClosed: () => void }> = ({
  onClosed,
}) => {
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

  const addPost = () => {
    postEmptyMutate();
    onClosed();
  };
  return (
    <div tw="p-6 box-border">
      <div tw="flex items-center mb-2 space-x-1">
        <Input type="text" label="搜索的文章" onChange={onInputChange} />
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
        loader={<h4 tw="label-large">Loading...</h4>}
        endMessage={
          <p tw="text-center label-large">
            <b>这是底线</b>
          </p>
        }
      >
        {data?.pages.map((page) => {
          return (
            <>
              {page.items.map((post) => {
                return (
                  <Link
                    key={post.id}
                    legacyBehavior
                    href={`/post/edit?p=${post.id}`}
                  >
                    <MenuItem
                      onClick={onClosed}
                      title={post.title}
                      href={`/post/edit?p=${post.id}`}
                    ></MenuItem>
                  </Link>
                );
              })}
            </>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
