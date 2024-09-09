import { PolymorphicComponentProps, Text, TextProps } from "@mantine/core";

interface Props extends PolymorphicComponentProps<"p", TextProps> {}

const ModalTitle = ({ children, ...props }: Props) => {
	return (
		<Text
			fw={600}
			size="lg"
			{...props}
		>
			{children}
		</Text>
	);
};

export default ModalTitle;
