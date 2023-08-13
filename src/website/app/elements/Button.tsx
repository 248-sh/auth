import { FC, MouseEvent, PropsWithChildren } from "react";
import { join } from "~/utils";

export const Button: FC<
  PropsWithChildren & {
    onClick: () => void;
    selected: boolean;
  }
> = ({ children, onClick, selected }) => {
  const onClickHandler = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    onClick();
  };

  return (
    <a
      href="#"
      onClick={onClickHandler}
      className={join(
        selected ? "bg-slate-300" : "hover:bg-slate-200",
        "bg-slate-100 max-w-[10rem] px-4 py-3 rounded-md text-center text-slate-500"
      )}
    >
      {children}
    </a>
  );
};
