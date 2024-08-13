import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const stationGroup = new Hono().basePath('/api')
const prisma=new PrismaClient()

stationGroup.post('/create/station/new',async(c)=>{
    const {user_name,stationId,stationName}=await c.req.json()
    try
    {
      const admin=await prisma.user.findFirst({
        where:{
          user_name:user_name
        }
      })
      if(admin)
      {
        if(admin.role==='ADMIN')
        {
          const station=await prisma.station.create({
            data:{
              stationId:stationId,
              stationName:stationName
            }
          })
          return c.json("Station added Successfully"+"\n"+station)
        }
        else
        {
          return c.json("User not allowed to enter the details")
        }
      }
      else
      {
        return c.json("Admin not found")
      }
    } 
    catch(e)
    {
      return c.json("Error")
    }
    finally
    {
      await prisma.$disconnect()
    }
  })
  
  stationGroup.delete('/delete/station/:id',async(c)=>{
    const {id}=c.req.param()
    try
    {
      const station=await prisma.station.delete({
        where:{
          stationId:id
        }
      })
      return c.json("Station deleted Successfully"+"\n"+station)
    }
    catch(e)
    {
      return c.json("Error")
    }
    finally
    {
      await prisma.$disconnect()
    }
  })

  stationGroup.get('/stations/:id',async(c)=>{
    const {id}=c.req.param()
    try
    {
      const station=await prisma.station.findUnique({
        where:{
          stationId:id
        }
      })
      if(station)
      {
        return c.json(station)
      }
      else
      {
        return c.json("Station Id is not valid")
      }
    }
    catch(e)
    {
      return c.json("Error")
    }
    finally
    {
      await prisma.$disconnect()
    }
  })

  stationGroup.get('/stations',async(c)=>{
    try
    {
      const stations=await prisma.station.findMany()
      return c.json(stations)
    }
    catch(e)
    {
      return c.json("Error")
    }
    finally
    {
      await prisma.$disconnect()
    }
  })

  export default stationGroup
  