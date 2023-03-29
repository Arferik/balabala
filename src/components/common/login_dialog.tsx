import RCDialog from "rc-dialog";
import React, { useEffect, useRef } from "react";
import "twin.macro";

import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils";
import { getCsrfToken } from "next-auth/react";

interface Inputs {
  username: string;
  password: string;
  csrfToken: string;
}

const LoginDialog: React.FC<any> = ({ visible, onCloseHandle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutate: userMutate } = api.user.login.useMutation();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const csrfToken = (await getCsrfToken()) || "";
    userMutate({
      username: data.username,
      password: data.password,
      csrfToken,
    });
    onCloseHandle();
  };

  return (
    <RCDialog
      closeIcon={""}
      visible={visible}
      maskClosable
      onClose={() => {
        onCloseHandle();
      }}
      title={<div tw="headline-small w-full text-center">登录</div>}
      footer={"dsds"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input type="text" {...register("username")} tw="bg-amber-400" />
        </label>
        <label>
          Password
          <input {...register("password")} tw="bg-amber-400" />
        </label>
        <button type="submit">sign up</button>
      </form>
    </RCDialog>
  );
};

export default LoginDialog;
