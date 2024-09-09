import { Box, Menu, MenuItemProps, Text } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

interface Props extends Omit<MenuItemProps, "children"> {
	title: string;
	description: string;
	icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MenuItem = ({ title, description, icon: MenuItemIcon, onClick, ...props }: Props) => {
	return (
		<Menu.Item
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
		</Menu.Item>
	);
};

export default MenuItem;
