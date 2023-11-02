import SwitchLang from "./SwitchLang"

const Header = () => {
  return (
    <div className="">
        <div className="container mx-auto py-2">
            <div className="flex items-center justify-end pr-6">
                <SwitchLang/>
            </div>
        </div>
    </div>
  )
}

export default Header