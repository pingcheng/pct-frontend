import { ReactNode, useEffect } from "react";
import { NavigationMenu } from "components/Navigation/NavigationMenu";
import { HiHeart } from "react-icons/hi";
import { setThemeColorMatchNavBar } from "utils/PageUtils";
import { profile } from "@config/profile";

export type WithNavigationMenuProps = {
  children: ReactNode;
};

export default function WithNavigationMenu({
  children,
}: WithNavigationMenuProps): JSX.Element {
  useEffect(() => {
    setThemeColorMatchNavBar();
  }, []);

  return (
    <div>
      <NavigationMenu />

      <div className="pt-8">
        {children}

        <div className="text-center text-gray-500 my-4 text-sm">
          Hand crafted with{" "}
          <span className="text-red-400 text-xl">
            <HiHeart />
          </span>{" "}
          by {profile.name}
        </div>
      </div>
    </div>
  );
}
