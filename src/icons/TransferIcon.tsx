interface TransferIconProps extends React.SVGProps<SVGSVGElement> {
  classnamepath?: string;
}

const TransferIcon: React.FC<TransferIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      className={props.classnamepath}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 17H4m0 0 4-4m-4 4 4 4M4 7h16m0 0-4-4m4 4-4 4"    />
  </svg>
);

export default TransferIcon;
