import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Connexion() {
    useEffect(() => {
        if(localStorage.getItem("utilisateur")){
            navigate("/")
        }
    })
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors } } = useForm();
    const onSubmit = (data) => {
    
    axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`)
    .then(res => {
        if(res.data.length > 0) {
            localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
            toast.success("Connexion reussie");
            navigate("/");
        } else {
            toast.error("Les identifiants sont incorrects");
        }
    })
    }
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#f5f5f5"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
      >
        <Typography variant="h5">Connexion</Typography>
        <form style={{
            marginTop: 4,
        }} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre mail"
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              {...register("mailUtilisateur", { required: "Veuillez saisir votre email", pattern:"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/" })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir un mot de passe"
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              {...register("motDePasse", { required: "Veuillez saisir un mot de passe", minLength:{ value: 6, message: "Veuillez saisir un mot de passe de plus de 5caractères" } })}

            />
          </Stack>
          <Button variant="contained"
          sx={{
            marginTop: 2
          }} type="submit">Connexion</Button>
          <Typography paddingTop={2}>Voulez-vous créer un compte ?{" "}<Link to='/inscription'>Cliquez ici</Link></Typography>
        </form>
      </Box>
    </Stack>
  );
}
