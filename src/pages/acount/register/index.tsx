import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { env } from "~/env.mjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(6),
  email: z.string().email("Email invalido"),
  password: z.string().min(6),
});

type fieldValues = z.infer<typeof schema>;

const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<fieldValues>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/register`, data)
      .then((data) => {
        setIsRegister(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      });
  };
  const onError = (error: any) => console.log({ error });

  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-5">
      <h1 className="text-center">Registrar</h1>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex  w-1/4 flex-col items-center justify-center gap-5 [&>*]:w-full "
      >
        <TextField
          helperText={errors.password?.message}
          error={errors.password ? true : false}
          label="Usuario"
          {...register("username")}
        />
        <TextField
          helperText={errors.email?.message}
          error={errors.email ? true : false}
          label="Email"
          {...register("email")}
        />
        <TextField
          helperText={errors.password?.message}
          error={errors.password ? true : false}
          label="Password"
          //   type="password"
          {...register("password")}
        />
        <div
          className={`${
            isRegister ? "" : "hidden"
          } rounded-sm border border-green-600 p-2 text-center`}
        >
          Usuario registrado
        </div>
        <Button variant="outlined" type="submit">
          Registrarse
        </Button>
        <Link href="/acount/login"> Ya estas registrado?</Link>
        <DevTool control={control} />
      </form>
    </div>
  );
};

export default Register;
