import { type NextPage } from "next";
import "twin.macro";
import { api } from "~/utils/api";
import { Button, Icon, Input, Layout, useSnackbar } from "~/components";
import { type Post } from "@prisma/client";
import Table from "rc-table";
import { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import Drawer from "rc-drawer";
import { useRouter } from "next/router";

const Manage: NextPage = () => {
  const paginationMute = api.post.pageList.useMutation();

  const delApi = api.post.delPostById.useMutation({
    onSuccess: () => {
      setConfirm(false);
      paginationMute.mutate({
        number: paginationMute.data?.input.number,
        size: paginationMute.data?.input.size,
      });
      open && open("删除成功");
    },
    onError: () => {
      open && open("删除失败");
    },
  });
  const { open } = useSnackbar();
  const [showConfirm, setConfirm] = useState<boolean>(false);
  const nextRoute = useRouter();
  const [readyDelInfo, setReadyDelInfo] = useState<Post>();

  const blogTableCols = [
    { title: "标题", dataIndex: "title", key: "title" },
    { title: "发布日期", dataIndex: "publish_date", key: "publish_date" },
    { title: "标签", dataIndex: "tag", key: "tag" },
    {
      title: "是否发布",
      dataIndex: "discoverable",
      key: "discoverable",
      render: (record: Post) => (record.discoverable ? "是" : "否"),
    },
    {
      title: "操作",
      dataIndex: "",
      key: "operation",
      render: (data: any) => {
        return (
          <div tw="text-center">
            <Button onClick={() => editItem(data)}>编辑</Button>
            <Button
              tw="text-error !bg-error-container"
              onClick={() => delItem(data)}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const onSearchHandle = () => {
    console.log("search");
  };

  const onPageChange = (page: number, pageSize: number) => {
    console.log("onPageChange", page, pageSize);
    paginationMute.mutate({
      number: page,
      size: pageSize,
    });
  };

  const editItem = (post: Post) => {
    nextRoute.push(`/post/edit/${post.id}`);
  };

  const delItem = (post: Post) => {
    setConfirm(true);
    setReadyDelInfo(post);
  };

  useEffect(() => {
    paginationMute.mutate({
      number: 1,
      size: 10,
    });
  }, []);

  return (
    <>
      <Layout>
        <section tw="container mx-auto items-stretch mt-16">
          <div tw="flex justify-between">
            <div tw="display-small md:display-medium lg:display-large text-on-surface px-4">
              博客列表
            </div>
            <Input
              placeholder="请输入搜索的博客名"
              onChange={onSearchHandle}
              trailingIcon={<Icon name="search"></Icon>}
            ></Input>
          </div>
          <div>
            <Table
              rowKey={(record) => record.id}
              data={paginationMute.data?.data}
              columns={blogTableCols}
            ></Table>
            <Pagination
              tw="mt-8"
              current={paginationMute.data?.input.number}
              onChange={onPageChange}
              showTotal={(total) => `Total ${total} items`}
              total={paginationMute.data?.count}
            />
          </div>
          <Drawer
            placement="bottom"
            open={showConfirm}
            prefixCls="drawer"
            maskClosable
          >
            {readyDelInfo?.title}
            <Button onClick={() => setConfirm(false)}>否</Button>
            <Button
              type="filled"
              onClick={() => {
                if (readyDelInfo?.id) {
                  delApi.mutate(readyDelInfo?.id);
                }
              }}
            >
              确定
            </Button>
          </Drawer>
        </section>
      </Layout>
    </>
  );
};

export default Manage;
