import { Dropdown, ToggleSwitch } from "flowbite-react";
import { Gear, Receipt } from "phosphor-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function NavbarMenu() {
  const auth = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="py-3">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex items-center gap-2 text-green-600">
          <span className=" self-center text-xl font-semibold whitespace-nowrap tracking-widest">WHERE'S THE MONEY?</span>
          <Receipt size={20} weight="fill" />
        </div>
        <div className="flex z-10">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Gear size={25} color="#52525b" weight="fill" />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {auth.user?.name}
              </span>
              <span className="block truncate text-sm font-medium">
                {auth.user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <div className="w-full flex justify-between items-center">
                
                <ToggleSwitch
                  checked={theme === "dark"}
                  label=""
                  onChange={(e) => setTheme(e === true ? "dark" : "light")}
                />
                <span>Modo escuro</span>
                {/* {
                  theme === "light" ?
                    <button className="hover:text-slate-400 transition-colors" onClick={() => setTheme("dark")}>
                      <SunDim size={25} />
                    </button> :
                    <button className="hover:text-slate-400 transition-colors" onClick={() => setTheme("light")}>
                      <Moon size={25} />
                    </button>
                } */}
              </div>
            </Dropdown.Item>
            {/* <Dropdown.Item>
              Alterar senha
            </Dropdown.Item> 
            <Dropdown.Divider /> */}
            <Dropdown.Item onClick={auth.Logout}>
              Sair
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>

  );
}