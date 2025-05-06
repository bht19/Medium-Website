import { Hono } from 'hono'
import { SignatureKey } from 'hono/utils/jwt/jws';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBloginput, updateBloginput } from '@bharatdondeti/medium-common';

export const blogRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET : SignatureKey
    },
	Variables: {
		userId: string,

	}
  }>();



blogRoute.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
		c.set("userId", user.id as string);
        await next();
    }else{
        c.status(403);
        return c.json({
            error : "You are not authorized"
        });
    }
    
})





blogRoute.post('/', async (c) => {
	const authorId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = createBloginput.safeParse(body);
		if ( !success ){
		  c.status(411);
		  return c.json({ message : " Error in the input elements "})
		}
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId : authorId
		}
	});
	return c.json({
		id: post.id
	});
})

blogRoute.put('/updateblog', async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updateBloginput.safeParse(body);
		if ( !success ){
		  c.status(411);
		  return c.json({ message : " Error in the input elements "})
		}
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRoute.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})

blogRoute.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({});

	return c.json(posts);
})