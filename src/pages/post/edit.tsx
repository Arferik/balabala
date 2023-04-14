import { type NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Drawer from "rc-drawer";
import {
  Button,
  Layout,
  Input,
  Card,
  Icon,
  useSnackbar,
  PostLayout,
  Textarea,
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
import Upload, { type UploadProps } from "rc-upload";
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

// TODO: 1. 上传图片 2.自定义标签 tags

const NewPost: NextPage = () => {
  const route = useRouter();
  const [value, setValue] = useState<string>("");
  const { open } = useSnackbar();
  const [confirmPublish, setConfigPublish] = useState<boolean>(false);
  const [showPostSlider, setShowPostSlider] = useState<boolean>(false);
  const [articleTitle, setArticleTitle] = useState<string>("");
  const { mutate: postIdMutate } = api.post.getPostById.useMutation({
    onSuccess: (data) => {
      setValue(data?.content || "");
    },
  });
  const { data: tags } = api.post.allTags.useQuery();
  const { data: categories } = api.post.allCatagories.useQuery();

  useEffect(() => {
    if (route.query.p) {
      const editParam = route.query.p;
      if (typeof editParam === "string") {
        postIdMutate(editParam);
      }
    } else {
    }
  }, [route.query.p]);

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

  const uploadProps: UploadProps = {
    multiple: false,
    onStart(file) {
      console.log("onStart", file, file.name);
    },
    onSuccess(res, file) {
      console.log("onSuccess", res, file.name);
    },
    onError(err) {
      console.log("onError", err);
    },
    async customRequest({ data, file, filename, headers, onError, onSuccess }) {
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      if (filename) formData.append(filename, file);
      try {
        const res = await fetch(`/api/image?id=${route.query.p}&type=cover`, {
          method: "POST",
          body: formData,
          headers: headers,
        }).then((resp) => resp.body);

        onSuccess && onSuccess(res, file);
      } catch (err) {
        onError && onError(err, null);
      }

      return {
        abort() {
          console.log("upload progress is aborted.");
        },
      };
    },
  };

  const onPostSliderClose = () => {
    setShowPostSlider(false);
  };

  const uploadImages: (files: File[]) => any = () => {
    return ["demo.url"];
  };

  const [name, setName] = useState("");
  const inputRef = useRef<any>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [items, setItems] = useState<any>([...categories]);
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Layout>
      <div tw="mt-20 flex container mx-auto mb-8 items-center">
        <Input
          type="text"
          label="请输入文章标题"
          onChange={onInputChange}
          value={articleTitle}
        />
        <Button
          icon={<Icon name="menu-4" tw="fill-on-surface"></Icon>}
          onClick={() => setShowPostSlider(true)}
        ></Button>
        <Button
          onClick={beginPublish}
          icon={<Icon name="file-upload" tw="fill-on-surface"></Icon>}
        ></Button>
      </div>
      <Editor
        value={value}
        plugins={plugins}
        onChange={editorOnChange}
        uploadImages={uploadImages}
      />

      <Drawer
        open={showPostSlider}
        onClose={onPostSliderClose}
        autoFocus={true}
        prefixCls="drawer"
      >
        <PostLayout></PostLayout>
      </Drawer>
      <Drawer
        open={confirmPublish}
        onClose={onClose}
        autoFocus={true}
        prefixCls="drawer"
      >
        <div tw="title-small box-border py-4 space-y-3 leading-[3.5rem] text-on-surface-variant flex flex-col items-center">
          <Card tw="w-64 h-32 flex items-center justify-center bg-on-primary-container cursor-pointer">
            <Upload {...uploadProps}>
              <Icon name="upload" tw="text-9xl fill-primary" size="lg"></Icon>
            </Upload>
          </Card>
          <div tw="w-full">
            <Select
              tw="w-full"
              prefixCls="rc-select"
              mode="tags"
              maxTagCount={5}
            >
              {Array.isArray(tags) &&
                tags.length > 0 &&
                tags.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </div>
          <div tw="w-full">
            <Select
              tw="w-full"
              prefixCls="rc-select"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Input ref={inputRef} value={name} onChange={onNameChange} />
                  <Button type="text" onClick={addItem}>
                    Add item
                  </Button>
                </>
              )}
              options={items.map((item: { name: any; id: any }) => ({
                label: item.name,
                value: item.id,
              }))}
            ></Select>
          </div>
          <Textarea tw="h-36 w-full" label="摘要"></Textarea>
          <Button type="filled" tw="w-full m-14">
            确认发布
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default NewPost;
