"use client";
import { register } from "@/action/auth";

import React, { useActionState } from "react";

function Register() {
  const [state, action, isPending] = useActionState(register, undefined);
  return (
    <div className="container flex justify-center   h-[100%]">
      <form
        action={action}
        className="bg-gray-100 py-10 px-4 rounded-md text-gray-900 flex flex-col gap-6 w-[400px] mt-10"
      >
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="bg-gray-300 py-2 px-4 w-full"
            type="text"
            name="email"
          />
          {state?.error?.email && (
            <p className="text-red-500">{state.error.email}</p>
          )}
        </div>
        <div>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            className="bg-gray-300 py-2 px-4 w-full"
            type="text"
            name="password"
          />
          {state?.error?.password && (
            <p className="text-red-500">
              {state.error.password.map((d) => (
                <span key={d}>{d},</span>
              ))}
            </p>
          )}
        </div>
        <div>
          <label className="block" htmlFor="confirmPassword">
            confirmPassword
          </label>
          <input
            className="bg-gray-300 py-2 px-4 w-full"
            type="text"
            name="confirmPassword"
          />
          {state?.error?.confirmPassword && (
            <p className="text-red-500">{state.error.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          {isPending ? "Loading" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
