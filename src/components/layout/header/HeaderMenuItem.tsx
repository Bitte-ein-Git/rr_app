import { Box, MenuItem, MenuItemProps, Text } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

interface Props extends Omit<MenuItemProps, "children"> {
	title: string;
	description: string;
	icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const HeaderMenuItem = ({ title, description, icon: MenuItemIcon, onClick, ...props }: Props) => {
	return (
		<MenuItem
			py="xs"
			pr="sm"
			leftSection={
				<MenuItemIcon
					style={{ marginTop: -18 }}
					size={20}
				/>
			}
			onClick={onClick}
			{...props}
		>
			<Box>
				<Text fw={500}>{title}</Text>
				<Text
					size="xs"
					c="dimmed"
				>
					{description}
				</Text>
			</Box>
		</MenuItem>
	);
};

export default HeaderMenuItem;
