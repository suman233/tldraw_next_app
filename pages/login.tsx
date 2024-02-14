import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { validationText } from "@/utils/validationtext";
import { useRouter } from "next/router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

interface loggedData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required(validationText.error.enter_email),
    password: yup.string().required(validationText.error.enter_password),
  })
  .required();

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loggedData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<loggedData> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      if (window !== undefined) {
        // onAuthStateChanged(auth, (user) => {
        //   if (user) {
        //     const uid = user.uid;
        //     localStorage.setItem("uid", uid);
        //     router.push("/");
        //   }
        // });
        window.localStorage.setItem("uid", user.uid);
        console.log("User created:", user);
        router.push("/");
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error.message);
    }
  };

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <Container>
        <Typography
          variant="h4"
          sx={{ my: 2, textAlign: "center", fontWeight: "bold" }}
        >
          Login Form
        </Typography>
        <Paper sx={{ p: 5, mx: 10 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              sx={{ my: 2 }}
              label="Email"
              {...register("email", { required: true, maxLength: 20 })}
              error={Boolean(errors?.email)}
              helperText={errors?.email?.message}
            />
            <TextField
              fullWidth
              sx={{ my: 2 }}
              label="Password"
              {...register("password", { required: true, maxLength: 20 })}
              type="password"
              error={Boolean(errors?.password)}
              helperText={errors?.password?.message}
            />
            <div style={{ textAlign: "center" }}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
