import { ActionIcon, MantineStyleProp, Tooltip, TooltipProps } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

interface Props extends Omit<TooltipProps, "children"> {
	icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
	transitionStyles?: MantineStyleProp;
	href?: string | undefined;
}

const FooterIcon = ({ icon: IconElement, transitionStyles, href, ...props }: Props) => {
	return (
		<Tooltip
			position="top-end"
			{...props}
		>
			<ActionIcon
				component="a"
				style={transitionStyles}
				variant="subtle"
				size={24}
				color="gray"
				href={href}
				target="_blank"
			>
				<IconElement size={16} />
			</ActionIcon>
		</Tooltip>
	);
};

export default FooterIcon;
