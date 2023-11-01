import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode,
}

const Layout: FC<Props> = ({children}) => {
  return (
    <div style={{display: 'grid', gridTemplateColumns: "1fr 4fr"}} className="">
        {children}
    </div>
  )
}

export default Layout