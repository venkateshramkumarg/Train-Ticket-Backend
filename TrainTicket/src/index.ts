import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const app = new Hono()
const prisma=new PrismaClient()

app.get('/',async(c)=>{
  return c.json("Welcome to Train Ticket Booking System")
})

app.post('/create/user/new',async(c)=>{
  const {user_name,password,email}=await c.req.json()
  try
  {
    const user=await prisma.user.create({
      data:{
        user_name:user_name,
        password:password,
        email:email
      }
    })
    return c.json("User added Successfully"+"\n"+user)
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

app.delete('/delete/user/:name',async(c)=>{
  const {name}=c.req.param()
  try
  {
    const user=await prisma.user.delete({
      where:{
        user_name:name
      }
    })
    return c.json("User deleted Successfully"+"\n"+user)
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

app.put('/update/user/:name',async(c)=>{
  const {name}=c.req.param()
  const {password,email}=await c.req.json()
  try
  {
    const user=await prisma.user.update({
      where:{
        user_name:name
      },
      data:{
        password:password,
        email:email
      }
    })
    return c.json("User updated Successfully"+"\n"+user)
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

app.post('/create/admin/new',async(c)=>{
  const {user_name,password,email}=await c.req.json()
  try
  {
    const user=await prisma.user.create({
      data:{
        user_name:user_name,
        password:password,
        email:email,
        role:"ADMIN"
      }
    })
    return c.json("User added Successfully"+"\n"+user)
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

app.delete('/delete/admin/:name',async(c)=>{
  const {name}=c.req.param()
  try
  {
    const user=await prisma.user.delete({
      where:{
        user_name:name
      }
    })
    return c.json("Admin deleted Successfully"+"\n"+user)
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

app.put('/update/admin/:name',async(c)=>{
  const {name}=c.req.param()
  const {password,email}=await c.req.json()
  try
  {
    const user=await prisma.user.update({
      where:{
        user_name:name
      },
      data:{
        password:password,
        email:email
      }
    })
    return c.json("Admin updated Successfully"+"\n"+user)
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

app.post('/check/user',async(c)=>{
  const {user_name,password}=await c.req.json()
  try
  {
    const user=await prisma.user.findFirst({
      where:{
        user_name:user_name
      },
      select:{
        user_name:true,
        password:true
      }
    })
    if(user)
    {
      if(user_name===user.user_name&&password===user.password)
      {
        return c.json("Credintials are correct")
      }
      else
      {
        return c.json("Credintials mismatch")
      }
    }
    else
    {
      return c.json("User not found")
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

app.post('/create/train/new',async(c)=>{
  const {user_name,trainNo,trainName,noOfSeatsAvailable,departureDate,stationIds}=await c.req.json()
  console.log(trainNo+trainName+noOfSeatsAvailable+departureDate+stationIds)
  try
  {
    const admin=await prisma.user.findFirst({
      where:{
        user_name:user_name
      },
      select:
      {
        role:true
      }
    })
    if(admin)
    {
      if(admin.role==='ADMIN')
      {
        const train = await prisma.train.create({
          data: {
            trainNo:trainNo,
            trainName:trainName,
            noOfSeatsAvailable:noOfSeatsAvailable,
            departureDate:departureDate,
            trainStations: {
              create:stationIds.map((id:String) => ({
                stationId: id,
              })),
            }
          },
        });
        
        return c.json("Train added Successfully"+"\n"+train)
      }
      else
      {
        return c.json("User not allowed to enter the details")
      }
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

app.delete('/delete/train/:number',async(c)=>{
  const {number}=c.req.param()
  let trainNo=Number(number)
  try
  {
    const train=await prisma.train.delete({
      where:{
        trainNo:trainNo
      }
    })
    return c.json("Train deleted Successfully"+"\n"+train)
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

app.post('/create/station/new',async(c)=>{
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

app.delete('/delete/station/:id',async(c)=>{
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

app.post('/create/booking/new',async(c)=>{
  const {user_name,trainNo,noOfSeats}=await c.req.json()
  try
  {

    const seats=await prisma.train.findFirst({
        where:{
          trainNo:trainNo
        },
        select:{
          noOfSeatsAvailable:true
        }
      })
      console.log(seats)
      if(seats)
      {
        const {noOfSeatsAvailable}=seats
        if(noOfSeatsAvailable>=noOfSeats)
        {
          const booking=await prisma.bookings.create({
            data:{
              user_name:user_name,
              trainNo:trainNo,
              noOfSeats:noOfSeats
            }
          })
          await prisma.train.update({
            where:{
              trainNo:trainNo
            },
            data:{
              noOfSeatsAvailable:{decrement:noOfSeats}
            }
          })

          return c.json("Booking done successfully"+"\n"+booking)
        }
        else
        {
          return c.json(`Only ${noOfSeatsAvailable} seats Available`)
        }
    }
    else
    {
      return c.json("Train No not valid")
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

app.delete('/delete/booking/:id',async(c)=>{
  const {id}=c.req.param()
  const booking_id=Number(id)
  try
  {
    const booking=await prisma.bookings.delete({
      where:{
        booking_id:booking_id
      }
    })
    return c.json("Booking deleted Successfully"+"\n"+booking)
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

app.get('/trains/:number',async(c)=>{
  const a=c.req.param()
  console.log(a)
  let {number}=c.req.param()
  let trainNo=Number(number)
  try
  {
    
    const trains=await prisma.train.findUnique({
      where:{
        trainNo:trainNo
      },
        select:{
        trainName:true,
        trainNo:true,
        noOfSeatsAvailable:true,
        departureDate:true,
        trainStations:{
          select:{
            station:true
          }
        }
      }
    })
    if(trains)
    {
      return c.json(trains)
    }
    else
    {
      return c.json("Train No is not valid")
    }
  }
  catch(e){
    return c.json("Error")
  }
  finally{
    await prisma.$disconnect()
  }
})

app.get('/stations/:id',async(c)=>{
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

app.get('/bookings/:id',async(c)=>{
  const {id}=c.req.param()
  const booking_id=Number(id)
  try
  {
    const booking=await prisma.bookings.findUnique({
      where:{
        booking_id:booking_id
      }
    })
    if(booking)
    {
      return c.json(booking)
    }
    else
    {
      return c.json("Booking Id is not valid")
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

app.get('/trains',async(c)=>{
  try
  {
    const trains=await prisma.train.findMany({
      select:{
        trainName:true,
        trainNo:true,
        noOfSeatsAvailable:true,
        departureDate:true,
        trainStations:{
          select:{
            station:true
          }
        }
      }
    })
    return c.json(trains)
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

app.get('/stations',async(c)=>{
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

export default app
