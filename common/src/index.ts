import z, { number, string } from "Zod";

// signup Zod validation 

export const SignupInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name : string().optional()
})

export type SignupInput = z.infer<typeof SignupInput>


// Signin ZOD validation

export const SigninInput = z.object({
    username : z.string().email(),
    password : z.string().min(6)
})

export type SigninInput = z.infer<typeof SignupInput>


// createBlog ZOD validation

export const createBloginput = z.object({
    title : z.string(),
    content : z.string()
})

export type createBloginput = z.infer<typeof createBloginput>


// updateBlog ZOD validation

export const updateBloginput = z.object({
    title : z.string(),
    content : z.string(),
    id : number()
})

export type updateBloginput = z.infer<typeof updateBloginput>



