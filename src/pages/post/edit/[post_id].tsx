import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Drawer from "rc-drawer";
import { Button, Layout, Input, Card, Fab, Icon } from "~/components";
import breaks from "@bytemd/plugin-breaks";
import frontMatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import byteMath from "@bytemd/plugin-math";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Editor } from "@bytemd/react";
import "twin.macro";
import { api } from "~/utils";
import { useRouter } from "next/router";
import throttle from "lodash/throttle";
import Select, { Option } from "rc-select";

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

const NewPost: NextPage = () => {
  const route = useRouter();
  const post_id = route.query.post_id as string;
  const postDraft = api.post.getPostById.useQuery(post_id || "");
  const [value, setValue] = useState<string>("");
  const [confirmPublish, setConfigPublish] = useState<boolean>(false);
  const [articleTitle, setArticleTitle] = useState<string>("");
  useEffect(() => {
    if (post_id) {
      setValue(postDraft.data?.content || "");
      setArticleTitle(postDraft.data?.title || "");
    }
  }, [postDraft.data, post_id]);
  const onClose = () => {
    setConfigPublish(false);
  };

  const beginPublish = () => {
    setConfigPublish(true);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setArticleTitle(event.target.value);
  };

  const editorOnChange = throttle((markContent: string) => {
    setValue(markContent);
  }, 2000);

  return (
    <Layout>
      <section tw="flex justify-between">
        <div tw="flex-1">
          <Input
            type="text"
            placeholder="请输入文章标题"
            value={articleTitle}
            onChange={onInputChange}
          />
        </div>
      </section>
      <Editor value={value} plugins={plugins} onChange={editorOnChange} />
      <Fab
        onClick={beginPublish}
        icon="publish"
        tw="fixed right-20 bottom-20 z-40 text-3xl"
        size="large"
      ></Fab>
      <Drawer
        open={confirmPublish}
        onClose={onClose}
        autoFocus={true}
        prefixCls="drawer"
      >
        <div tw="title-small box-border py-4 space-y-3 leading-[3.5rem] text-on-surface-variant flex flex-col items-center">
          <Card tw="w-64 h-32">
            <input
              type="file"
              placeholder="请上传封面图片"
              tw="hidden"
              id="upload-image"
            />
            <label
              tw="w-full h-full block cursor-pointer text-center"
              className="material-symbols-outlined"
              htmlFor="upload-image"
            >
              <Icon
                name="add_photo_alternate"
                tw="text-9xl text-surface-variant"
              ></Icon>
            </label>
          </Card>
          <Card tw="h-36 w-full">
            <div>
              <Select tw="w-full">
                <Option value="jack">jack</Option>
                <Option value="lucy">lucy</Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>
            </div>
          </Card>
          <Card tw="h-36 w-full">分类</Card>
          <Card tw="h-36 w-full">摘要</Card>
          <Button type="filled" tw="w-full m-14">
            确认发布
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default NewPost;
