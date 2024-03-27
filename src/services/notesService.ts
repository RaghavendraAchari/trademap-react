import backendUrls from "@/constants/backendUrls";
import Note from "@/models/notes/Note";
import axios, { AxiosError } from "axios";

export async function getNotes(): Promise<Array<Note>> {
    try {
        let response = await axios.get(backendUrls.notes.allNotes);

        return response.data;

    } catch {
        throw new AxiosError()
    }

    // return [
    //     {
    //         id: 1,
    //         categories: ["Hot🔥"],
    //         tags: ["#SWING_TRADE"],
    //         dateTime: new Date(),
    //         title: "MTARTECH forming a cup and handle",
    //         desciption: "Buy at 550",
    //         content: "MTAR tech is trading at 540 now. There is a good resistance at 550. When it crosses the resistance and closes above that line, then you can buy."
    //     },
    //     {
    //         id: 2,
    //         categories: ["Hot🔥"],
    //         tags: ["#SWING_TRADE"],
    //         dateTime: new Date(),
    //         title: "MTARTECH forming a cup and handle",
    //         desciption: "Buy at 550",
    //         content: "MTAR tech is trading at 540 now. There is a good resistance at 550. When it crosses the resistance and closes above that line, then you can buy."
    //     },
    //     {
    //         id: 3,
    //         categories: ["Hot🔥"],
    //         tags: ["#SWING_TRADE"],
    //         dateTime: new Date(),
    //         title: "MTARTECH forming a cup and handle",
    //         desciption: "Buy at 550",
    //         content: "MTAR tech is trading at 540 now. There is a good resistance at 550. When it crosses the resistance and closes above that line, then you can buy."
    //     },
    //     {
    //         id: 4,
    //         categories: ["Hot🔥"],
    //         tags: ["#SWING_TRADE"],
    //         dateTime: new Date(),
    //         title: "MTARTECH forming a cup and handle",
    //         desciption: "Buy at 550",
    //         content: "MTAR tech is trading at 540 now. There is a good resistance at 550. When it crosses the resistance and closes above that line, then you can buy."
    //     },
    //     {
    //         id: 5,
    //         categories: ["Hot🔥"],
    //         tags: ["#SWING_TRADE"],
    //         dateTime: new Date(),
    //         title: "MTARTECH forming a cup and handle",
    //         desciption: "Buy at 550",
    //         content: "MTAR tech is trading at 540 now. There is a good resistance at 550. When it crosses the resistance and closes above that line, then you can buy."
    //     },
    //     {
    //         id: 6,
    //         categories: ["Hot🔥"],
    //         tags: ["#SWING_TRADE"],
    //         dateTime: new Date(),
    //         title: "MTARTECH forming a cup and handle",
    //         desciption: "Buy at 550",
    //         content: "MTAR tech is trading at 540 now. There is a good resistance at 550. When it crosses the resistance and closes above that line, then you can buy."
    //     },
    //     {
    //         id: 7,
    //         categories: ["Hot🔥"],
    //         tags: ["#SWING_TRADE"],
    //         dateTime: new Date(),
    //         title: "MTARTECH forming a cup and handle",
    //         desciption: "Buy at 550",
    //         content: "MTAR tech is trading at 540 now. There is a good resistance at 550. When it crosses the resistance and closes above that line, then you can buy."
    //     }
    // ]
}

export async function postNote(note: Note) {
    try {
        let response = await axios.post(backendUrls.notes.allNotes, note);
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error()
        }
    } catch (e) {
        throw e;
    }
}