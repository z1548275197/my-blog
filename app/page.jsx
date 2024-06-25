// app/page.tsx
import { Button } from '@nextui-org/button';
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 mt-4 md:py-10">
      <div className="text-3xl font-bold underline">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>朝花&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>夕拾&nbsp;</h1>
          <br /><br />
          <h1 className={title()}>
            人不能同时拥有青春和对青春的感受.
          </h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            The youth cannot have both youth and the experience of youth simultaneously.
          </h2>
        </div>
      </div>
    </div>


  )
}