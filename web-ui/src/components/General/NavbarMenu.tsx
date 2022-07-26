import { Dropdown } from "flowbite-react";
import { Receipt, UserCircle } from "phosphor-react";
import { useAuth } from "../../contexts/AuthContext";

export default function NavbarMenu() {
  const auth = useAuth();

  return (
    <nav className="py-3">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex items-center gap-2 text-green-600">          
          <span className=" self-center text-xl font-semibold whitespace-nowrap tracking-widest">MY FINANCES</span>
          <Receipt size={20} weight="fill" />
        </div>
        <div className="flex z-10">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<UserCircle size={30} color="#52525b" weight="fill" />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {auth.user?.name}
              </span>
              <span className="block truncate text-sm font-medium">
                {auth.user?.email}
              </span>
            </Dropdown.Header>
            {/* <Dropdown.Item>
              Alterar tema
            </Dropdown.Item>
            <Dropdown.Item>
              Alterar senha
            </Dropdown.Item> 
            <Dropdown.Divider />*/}
            <Dropdown.Item onClick={auth.Logout}>
              Sair
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>

  );
}