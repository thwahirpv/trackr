"use server"

import connectToDatabase from '@/lib/db'
import { getSession } from '@/lib/session'
import { contactModel } from '@/model/Contact'


export const getContactById = async (id) => {
    await connectToDatabase()
    const user = await getSession()
    const contact = await contactModel.findOne({_id: id, userId: user.id})
    return JSON.parse(JSON.stringify(contact))
}