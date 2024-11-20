interface DepositIconProps extends React.SVGProps<SVGSVGElement> {
  classnamepath?: string;
}

const DepositIcon: React.FC<DepositIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      className={props.classnamepath}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 13v1.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 19 15.88 19 14.2 19H5.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C1 16.72 1 15.88 1 14.2V13m14-5-5 5m0 0L5 8m5 5V1"
      />
  </svg>
);

export default DepositIcon;
