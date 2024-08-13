import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const app = new Hono()
const prisma=new PrismaClient()



app.post('/postUser',async(c)=>{
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

app.post('/postAdmin',async(c)=>{
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

app.post('/checkUser',async(c)=>{
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

app.post('/addTrain',async(c)=>{
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

app.post('/addStation',async(c)=>{
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

app.post('/addBooking',async(c)=>{
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

app.get('/getTrains/:number',async(c)=>{
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

export default app
