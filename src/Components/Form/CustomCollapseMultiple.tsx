/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionItem, Checkbox,CheckboxGroup } from "@nextui-org/react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type CustomCollapseMultipleProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  customStyle?: string;
  disabled?: boolean;
  changeOnValue: (value: any) => void;
};

const CustomCollapseMultiple: React.FC<CustomCollapseMultipleProps> = ({
  label,
  name,
  options,
  customStyle,
  disabled,
  changeOnValue,
}) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    changeOnValue(inputValue);
  }, [inputValue, changeOnValue]);

  return (
    <div className={customStyle}>
      <Accordion>
        <AccordionItem title={label} key={name} aria-label={label}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                {...field}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {options?.map((item) => (
                  <Checkbox
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    style={{ color: "#ffb84b" }} // Gold color for checkbox labels
                  >
                    {item.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CustomCollapseMultiple;