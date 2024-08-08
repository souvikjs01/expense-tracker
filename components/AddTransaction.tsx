'use client'

import addTransaction from "@/actions/addTransaction"
import { useRef } from "react"
import { toast } from "react-toastify"

export default function AddTransaction() {
    const formRef = useRef<HTMLFormElement>(null)
    const clientAction = async (formData: FormData) => {
        const result = await addTransaction(formData)
        
        if(result.error){
            toast.error(result.error)
        } else{
            toast.success('Transaction Added')
            formRef.current?.reset()
        }
    }
  return (
    <>
      <h3>Add transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" name="text" id="text" placeholder="enter text..." />
        </div>
        <div className="form-control">
            <label htmlFor="amount">Amount <br/> (negative - expense, positive - income)</label>
            <input type="number" name="amount" id="amount" placeholder="enter amount..." step='0.01'/>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}
