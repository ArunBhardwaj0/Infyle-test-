import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold">Vendor Panel</h1>
      <ProfileMenu />
    </div>
  );
}



