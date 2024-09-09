import {
	Icon,
	IconProps,
	IconSortAscendingLetters,
	IconSortAscendingNumbers,
	IconSortDescendingLetters,
	IconSortDescendingNumbers,
} from "@tabler/icons-react";

const useSortIcon = (
	property: string,
	descending: boolean,
	stringProperties: string[]
): React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>> => {
	if (stringProperties.includes(property)) {
		return descending ? IconSortDescendingLetters : IconSortAscendingLetters;
	}

	return descending ? IconSortDescendingNumbers : IconSortAscendingNumbers;
};

export default useSortIcon;
