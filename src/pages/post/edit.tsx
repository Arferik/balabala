import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Drawer from "rc-drawer";
import {
  Button,
  Layout,
  Input,
  Card,
  Fab,
  Icon,
  useSnackbar,
  PostLayout,
} from "~/components";
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
import Upload from "rc-upload";

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
  const { editParam } = route.query;
  if (editParam) {
  }
  const postDraft = api.post.getPostById.useQuery("");
  api.post.pageList.useMutation();
  const [value, setValue] = useState<string>("");
  const [confirmPublish, setConfigPublish] = useState<boolean>(false);
  const [articleTitle, setArticleTitle] = useState<string>("");
  const { open } = useSnackbar();
  useEffect(() => {
    if (post_id !== "new_post") {
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

  const uploadProps = {
    action: "/upload.do",
    multiple: false,
    data: { a: 1, b: 2 },
    headers: {
      Authorization: "$prefix $token",
    },
    onStart(file) {
      console.log("onStart", file, file.name);
    },
    onSuccess(res, file) {
      console.log("onSuccess", res, file.name);
    },
    onError(err) {
      console.log("onError", err);
    },
    onProgress({ percent }, file) {
      console.log("onProgress", `${percent}%`, file.name);
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      // EXAMPLE: post form-data with 'axios'
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append(filename, file);

      return {
        abort() {
          console.log("upload progress is aborted.");
        },
      };
    },
  };

  return (
    <Layout>
      <PostLayout>dsad</PostLayout>
      <section tw="flex justify-between">
        <div tw="flex-1">
          <Input
            type="text"
            label="请输入文章标题"
            value={articleTitle}
            onChange={onInputChange}
          />
        </div>
      </section>
      <Editor value={value} plugins={plugins} onChange={editorOnChange} />
      <Fab
        onClick={beginPublish}
        icon="file-upload"
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
            <Upload {...uploadProps}>
              <label
                tw="w-full h-full block cursor-pointer text-center"
                className="material-symbols-outlined"
                htmlFor="upload-image"
              >
                <Icon
                  name="file-upload"
                  tw="text-9xl fill-surface-variant"
                ></Icon>
              </label>
            </Upload>
          </Card>
          <Card tw="h-36 w-full">
            <div>
              <Select tw="w-full" prefixCls="rc-select">
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
