import React from "react";
import { NotebookIcon, X } from "lucide-react";
import { Link } from "react-router";

const GetStarted = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-5 max-w-xs lg:max-w-md xl:max-w-md mx-auto text-center font-mono">
            <div className="bg-primary/10 rounded-full p-8">
                {/* <img src="/assets/langnote.png" alt="logo" className="size-10" /> */}
                <NotebookIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Welcome to LangNote!</h3>
            <p className="text-base-content/70">
                Hi there! Welcome to LangNote. Get started by creating your LangNote
                account.
                <br />
            </p>

            {/* <div className="card bg-base-100 w-96 shadow-xl" onClick={() => document.getElementById('note_modal').showModal()}>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
            </div>

            <dialog id="note_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <X className="absolute right-2 top-2"/>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog> */}
        </div>
    );
};

export default GetStarted;
