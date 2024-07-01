import { Button, Checkbox, Group, NumberInput, Select, Text, TextInput } from "@mantine/core"
import { Form, useForm } from "@mantine/form"
import { ItemType } from "../../interfaces/item"

interface EntityFormProps {
    entity: Record<string, any>
    onSubmit: (entity: Record<string, string>) => void
    title: string
}

const EntityForm = ({ entity, onSubmit, title }: EntityFormProps) => {
    const form = useForm({
        initialValues: entity
    })

    const isEnum = (value: any): value is ItemType => {
        return Object.values(ItemType).includes(value);
    };

    return (
        <Form
            form={form}
            onSubmit={() => onSubmit(form.values)}
        >
            <Text size="xl">{title}</Text>
        {Object.keys(entity).map((key) => {
                const value = form.values[key];
                const type = typeof value;

                return (
                <div key={key}>
                    {type === "string" &&  !isEnum(value) && (
                    <TextInput
                        label={key}
                        placeholder={`Enter ${key}`}
                        required
                        value={value}
                        onChange={(event) =>
                        form.setFieldValue(key, event.currentTarget.value)
                        }
                        autoComplete={key}
                    />
                    )}

                    {type === "number" && (
                    <NumberInput
                        label={key}
                        placeholder={`Enter ${key}`}
                        required
                        value={value}
                        onChange={(val) => form.setFieldValue(key, val ?? 0)}
                    />
                    )}

                    {type === "boolean" && (
                    <Checkbox
                        label={key}
                        checked={value}
                        onChange={(event) =>
                        form.setFieldValue(key, event.currentTarget.checked)
                        }
                    />
                    )}

                    {isEnum(value) && (
                        <Select
                            label={key}
                            placeholder={`Select ${key}`}
                            required
                            data={Object.values(ItemType).map((itemType) => ({
                            value: itemType,
                            label: itemType,
                            }))}
                            value={value}
                            onChange={(val) => form.setFieldValue(key, val)}
                        />
                    )}
                    
                    
                </div>
                );
            })}
            <Group mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </Form>
    )
}

export default EntityForm