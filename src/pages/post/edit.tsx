import { type NextPage } from "next";
import Image from "next/image";
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
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMerge } from "~/hooks";
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
  const utils = api.useContext();
  const [value, setValue] = useState<string>("");
  const [tagsVal, setTagVal] = useState<string[]>();
  const [categoryVal, setCategoryVal] = useState<string>();
  const [introduceVal, setIntroduceVal] = useState<string>("");
  const { open } = useSnackbar();
  const [confirmPublish, setConfigPublish] = useState<boolean>(false);
  const [showPostSlider, setShowPostSlider] = useState<boolean>(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState<boolean>(false);
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState<{ url?: string; name?: string }>(
    {}
  );
  const { mutate: postIdMutate } = api.post.getPostById.useMutation({
    onSuccess: (data) => {
      setValue(data?.content || "");
      // 设置图片
      setCoverImage(data?.cover || {});
      setArticleTitle(data?.title || "");
      setIntroduceVal(data?.introduce || "");
    },
  });
  const { data: tags } = api.post.allTags.useQuery();
  const { data: categories } = api.category.allCatagories.useQuery();
  const { mutate: categoryMutate } = api.category.addCategory.useMutation({
    onSuccess: () => {
      open("添加分类成功");
      utils.category.allCatagories.refetch();
    },
  });

  const { mutate: postMutate } = api.post.updatePost.useMutation({
    onSuccess: () => {
      open("更新成功");
    },
  });

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
    postMutate({
      id: route.query.p as string,
      title: articleTitle,
      content: value,
      cover: {
        url: coverImage.url || "",
        name: coverImage.name || "",
      },
      introduce: introduceVal,
      category: categoryVal,
    });
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
    onSuccess(res) {
      const { image } = res as { image: string };
      if (image) {
        setCoverImage({
          url: image || "",
        });
      }
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
        }).then((resp) => resp.json());

        onSuccess && onSuccess(res, file);
      } catch (err: any) {
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

  const openAddCateDialog = () => {
    setShowCategoryDialog(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({
    resolver: zodResolver(
      z.object({
        title: z
          .string()
          .min(2, {
            message: "至少2个字符",
          })
          .max(6, {
            message: "不能超过6个字符",
          }),
      })
    ),
  });

  const onCategorySubmit: SubmitHandler<{ title: string }> = async (data) => {
    await categoryMutate({
      name: data.title,
    });
    setShowCategoryDialog(false);
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
        <div tw="text-on-surface-variant title-small box-border px-4 h-14 leading-[3.5rem]">
          {"确认发布"}
        </div>
        <Drawer
          prefixCls="drawer"
          open={showCategoryDialog}
          onClose={() => setShowCategoryDialog(false)}
        >
          <div tw="text-on-surface-variant title-small box-border px-4 h-14 leading-[3.5rem]">
            {"新增类别"}
          </div>
          <form onSubmit={handleSubmit(onCategorySubmit)}>
            <Input
              trailingIcon="text"
              label="标题"
              errors={errors}
              {...register("title")}
            ></Input>
            <Button onClick={() => setShowCategoryDialog(false)}>取消</Button>
            <Button nativeType="submit">确认</Button>
          </form>
        </Drawer>
        <div tw="title-small box-border py-4 space-y-3 leading-[3.5rem] text-on-surface-variant flex flex-col items-center">
          <Card tw="w-64 h-32 flex items-center justify-center bg-on-primary-container cursor-pointer">
            <Upload {...uploadProps}>
              <Icon name="upload" tw="text-9xl fill-primary" size="lg"></Icon>
              <Image src={coverImage?.url || ""} alt="cover" fill></Image>
            </Upload>
          </Card>
          <Select
            tw="w-full"
            prefixCls="rc-select"
            mode="tags"
            tokenSeparators={[","]}
            maxTagCount={5}
            value={tagsVal}
            onChange={(val) => setTagVal(val)}
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
          <Select
            tw="w-full"
            prefixCls="rc-select"
            value={categoryVal}
            onChange={(val) => setCategoryVal(val)}
          >
            {Array.isArray(categories) &&
              categories.length > 0 &&
              categories.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
          <Button type="outlined" tw="w-full" onClick={openAddCateDialog}>
            新增类别
          </Button>
          <Textarea tw="h-36 w-full" label="摘要"></Textarea>
          <Button type="filled" tw="w-full m-14" onClick={beginPublish}>
            确认发布
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default NewPost;
